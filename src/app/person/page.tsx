"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddContractPerson from "./addContractPerson";
import ViewContractPerson from "./viewContractPerson";

export default function PersonPage() {
  return (
    <main className="flex justify-center">
      <Tabs defaultValue="addContracts" className="w-full justify-center">
        <TabsList>
          <TabsTrigger value="addContracts">Adicionar contratos</TabsTrigger>
          <TabsTrigger value="viewContracts">Visualizar contratos</TabsTrigger>
        </TabsList>
        <TabsContent value="addContracts">
          <AddContractPerson />
        </TabsContent>
        <TabsContent value="viewContracts">
          <ViewContractPerson />
        </TabsContent>
      </Tabs>
    </main>
  );
}
