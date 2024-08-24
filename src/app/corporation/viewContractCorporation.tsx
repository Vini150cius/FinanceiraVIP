"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import * as firebase from "firebase/app";
import "firebase/database";
import { getDatabase, ref, get, child, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Data {
  contrato: Array<{
    id: string;
    ie: string;
    cnpj: string;
    installmentValue: number;
    name: string;
    time: string;
    value: number;
  }>;
}

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

export default function ViewContractCorporation() {
  const [contractData, setContractData] = useState<Data>({
    contrato: [],
  });

  firebase.initializeApp(firebaseConfig);
  const db = getDatabase();

  function GetData() {
    const dbRef = ref(db);

    get(child(dbRef, "financeiravip/contractsCorporation")).then((snapshot) => {
      if (snapshot.exists()) {
        setContractData({ contrato: snapshot.val() });
      }
    });
  }

  async function RemoveData(idContrato: string) {
    try {
      await remove(ref(db, `financeiravip/contractsCorporation/${idContrato}`));
      console.log("Contrato removido com sucesso");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao remover contrato", error);
      throw error; 
    }
  }

  useEffect(() => {
    GetData();
  });

  useEffect(() => {
    if (contractData && contractData.contrato) {
      const contratoArray = Object.values(contractData.contrato);
    }
  }, [contractData]);
  return (
    <main className="flex justify-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">N° do contrato</TableHead>
            <TableHead className="w-[200px]"> Nome do contratante</TableHead>
            <TableHead className="w-[200px]">Valor do contrato</TableHead>
            <TableHead className="w-[100px]">Prazo</TableHead>
            <TableHead className="w-[200px]">CNPJ</TableHead>
            <TableHead className="w-[100px]">Inscrição Estadual</TableHead>
            <TableHead className="w-[150px]">Valor da prestação</TableHead>
            <TableHead className="w-[100px] text-center">
              Excluir linha
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(contractData.contrato).map((contrato, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{contrato.id}</TableCell>
              <TableCell>{contrato.name}</TableCell>
              <TableCell>R$ {contrato.value.toLocaleString("pt-BR")}</TableCell>
              <TableCell>{contrato.time} dias</TableCell>
              <TableCell>{contrato.cnpj}</TableCell>
              <TableCell>{contrato.ie}</TableCell>
              <TableCell>
                R$ {contrato.installmentValue.toString().replace(".", ",")}
              </TableCell>
              <TableCell className="flex justify-center items-center m-4">
                <a
                  onClick={() => {
                    RemoveData(contrato.id);
                  }}
                >
                  <RiDeleteBin6Line />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
