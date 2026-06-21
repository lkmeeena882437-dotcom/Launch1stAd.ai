"use client";

import { useEffect, useState } from "react";
import type { SavedBusiness } from "@/lib/saved";
import { activeClientKey, getClients, makeClientProfile, saveClients, setActiveClient, type ClientProfile } from "@/lib/workspace";
import { ClientCard } from "./ClientCard";
import { ClientForm } from "./ClientForm";

export function WorkspaceManager() {
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setClients(getClients());
    setActiveId(window.localStorage.getItem(activeClientKey) || "");
  }, []);

  function addClient(profile: SavedBusiness) {
    const nextClient = makeClientProfile(profile);
    const nextClients = [nextClient, ...clients];
    saveClients(nextClients);
    setActiveClient(nextClient.id);
    setClients(nextClients);
    setActiveId(nextClient.id);
  }

  function selectClient(clientId: string) {
    setActiveClient(clientId);
    setActiveId(clientId);
  }

  return (
    <div className="mt-8 grid gap-8">
      <ClientForm onAdd={addClient} />
      <section className="rounded-2xl bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Saved clients</h2>
          <p className="text-sm text-muted">Select one client to auto-fill Campaign Builder.</p>
        </div>
        {clients.length === 0 ? (
          <p className="mt-5 text-muted">Abhi koi client saved nahi hai. Upar se pehla business add karo.</p>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} active={client.id === activeId} onSelect={() => selectClient(client.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
