"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9NQXKuNIhGLMa_iBc8uvfM1PmHjMBckI",
  authDomain: "servertestdev-6cfaa.firebaseapp.com",
  projectId: "servertestdev-6cfaa",
  storageBucket: "servertestdev-6cfaa.appspot.com",
  messagingSenderId: "632621762228",
  appId: "1:632621762228:web:8af9f0a4b2bbda25f979e1",
  measurementId: "G-1952GW0QL1",
  databaseURL: "https://servertestdev-6cfaa-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export interface Contract {
  id: string;
  nameContractor: string;
  value: number;
  time: string;
}

interface ContractPerson extends Contract {
  CPF: string;
  age: string;
}

export interface ContractPersonData {
  id: string;
  name: string;
  value: number;
  time: string;
  cpf: string;
  age: string;
  installmentValue: number;
}

export default function AddContractPerson() {
  const [contractPerson, setContractPerson] = useState<ContractPerson>({
    id: "",
    nameContractor: "",
    value: 0.0,
    time: "",
    CPF: "",
    age: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(contractPerson);
    let InstallmentValue = contractPerson.value / Number(contractPerson.time);
    console.log(InstallmentValue);
    if (Number(contractPerson.age) <= 30) {
      InstallmentValue += 1;
    } else if (Number(contractPerson.age) <= 40) {
      InstallmentValue += 2;
    } else if (Number(contractPerson.age) <= 50) {
      InstallmentValue += 3;
    } else if (Number(contractPerson.age) > 50) {
      InstallmentValue += 4;
    } else {
      alert("!!Erro ao realizar o calculo das prestações!!");
    }
    console.log(InstallmentValue);
    try {
      const db = getDatabase();
      set(ref(db, "financeiravip/contractsPersons/" + contractPerson.id), {
        id: contractPerson.id,
        name: contractPerson.nameContractor,
        value: contractPerson.value,
        time: contractPerson.time,
        cpf: contractPerson.CPF,
        age: contractPerson.age,
        installmentValue: InstallmentValue.toFixed(2),
      })
        .then(() => {
          console.log("Dados enviados com sucesso!");
          console.log(InstallmentValue);
        })
        .catch((error) => {
          console.error("Erro ao enviar dados:", error);
        });
      setContractPerson({
        id: "",
        nameContractor: "",
        value: 0,
        time: "",
        CPF: "",
        age: "",
      });
    } catch {
      alert("!!Erro ao realizar o calculo das prestações... ");
    }
  };
  return (
    <main className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Pessoas físicas</CardTitle>
            <CardDescription>Contrato de financiamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="contractId">Número do contrato</Label>
              <Input
                id="contractId"
                value={contractPerson.id}
                pattern="[0-9]*"
                onChange={(event) =>
                  setContractPerson({
                    ...contractPerson,
                    id: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nameContractor">Nome do contratante</Label>
              <Input
                id="nameContractor"
                value={contractPerson.nameContractor}
                onChange={(event) =>
                  setContractPerson({
                    ...contractPerson,
                    nameContractor: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="value">Valor (R$)</Label>
              <Input
                id="value"
                type="number"
                value={contractPerson.value}
                pattern="[0-9]*"
                onChange={(event) =>
                  setContractPerson({
                    ...contractPerson,
                    value: parseFloat(event.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Prazo (dias)</Label>
              <Input
                id="time"
                type="number"
                value={contractPerson.time}
                pattern="[0-9]*"
                onChange={(event) =>
                  setContractPerson({
                    ...contractPerson,
                    time: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Idade</Label>
              <Input
                id="age"
                type="number"
                value={contractPerson.age}
                pattern="[0-9]*"
                onChange={(event) =>
                  setContractPerson({
                    ...contractPerson,
                    age: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">CPF</Label>
              <Input
                id="cpf"
                type="string"
                value={contractPerson.CPF}
                pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                onChange={(event) =>
                  setContractPerson({
                    ...contractPerson,
                    CPF: event.target.value,
                  })
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Concluir</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
