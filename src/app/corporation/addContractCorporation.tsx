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
import { Contract } from "../person/addContractPerson";

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

interface ContractCorporation extends Contract {
  CNPJ: string;
  IE: string;
}

interface ContractCorporationData {
  id: string;
  name: string;
  value: number;
  time: string;
  cnpj: string;
  ie: string;
  installmentValue: number;
}

export default function AddContractCorporation() {
  const [contractCorporation, setContractCorporation] =
    useState<ContractCorporation>({
      id: "",
      nameContractor: "",
      value: 0,
      time: "",
      CNPJ: "",
      IE: "",
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(contractCorporation);
    const InstallmentValue =
      contractCorporation.value / Number(contractCorporation.time) + 3;
    try {
      const db = getDatabase();
      set(
        ref(db, "financeiravip/contractsCorporation/" + contractCorporation.id),
        {
          id: contractCorporation.id,
          name: contractCorporation.nameContractor,
          value: contractCorporation.value,
          time: contractCorporation.time,
          cnpj: contractCorporation.CNPJ,
          ie: contractCorporation.IE,
          installmentValue: InstallmentValue.toFixed(2),
        }
      )
        .then(() => {
          console.log("Dados enviados com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao enviar dados:", error);
        });
      setContractCorporation({
        id: "",
        nameContractor: "",
        value: 0,
        time: "",
        CNPJ: "",
        IE: "",
      });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };
  return (
    <main className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Pessoas Juríticas</CardTitle>
            <CardDescription>
              Contrato de financiamento jurítico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="contractId">Número do contrato</Label>
              <Input
                id="contractId"
                value={contractCorporation.id}
                pattern="[0-9]*"
                onChange={(event) =>
                  setContractCorporation({
                    ...contractCorporation,
                    id: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nameContractor">Nome do contratante</Label>
              <Input
                id="nameContractor"
                value={contractCorporation.nameContractor}
                onChange={(event) =>
                  setContractCorporation({
                    ...contractCorporation,
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
                value={contractCorporation.value}
                pattern="[0-9]*"
                onChange={(event) =>
                  setContractCorporation({
                    ...contractCorporation,
                    value: Number(event.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Prazo (dias)</Label>
              <Input
                id="time"
                type="number"
                value={contractCorporation.time}
                pattern="[0-9]*"
                onChange={(event) =>
                  setContractCorporation({
                    ...contractCorporation,
                    time: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">CNPJ</Label>
              <Input
                id="cnpj"
                value={contractCorporation.CNPJ}
                pattern="[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}"
                onChange={(event) =>
                  setContractCorporation({
                    ...contractCorporation,
                    CNPJ: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Inscrição Estadual</Label>
              <Input
                id="ie"
                type="number"
                value={contractCorporation.IE}
                pattern="[0-9]*"
                onChange={(event) =>
                  setContractCorporation({
                    ...contractCorporation,
                    IE: event.target.value,
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
