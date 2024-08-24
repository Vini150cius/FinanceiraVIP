"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddContractCorporation from "./addContractCorporation";
import ViewContractCorporation from "./viewContractCorporation";

export default function PersonPage() {
  return (
    <main className="flex justify-center">
      <Tabs defaultValue="addContracts" className="w-full justify-center">
        <TabsList>
          <TabsTrigger value="addContracts">Adicionar contratos</TabsTrigger>
          <TabsTrigger value="viewContracts">Visualizar contratos</TabsTrigger>
        </TabsList>
        <TabsContent value="addContracts">
          <AddContractCorporation />
        </TabsContent>
        <TabsContent value="viewContracts">
          <ViewContractCorporation />
        </TabsContent>
      </Tabs>
    </main>
  );
}
