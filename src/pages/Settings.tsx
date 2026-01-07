import { useState } from "react";
import { SettingsTemplate } from "@/components/templates";
import { mockTransactions, mockOrders, mockSocialLinks } from "@/data/transactions";
import { signOut } from "@/services";

type SettingsTab = "basic" | "security" | "balance" | "history";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("basic");
  const [name, setName] = useState("Lesha Maisak");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState(mockSocialLinks);

  const handleSocialLinkChange = (index: number, url: string) => {
    const newLinks = [...socialLinks];
    newLinks[index].url = url;
    setSocialLinks(newLinks);
  };

  return (
    <SettingsTemplate
      activeTab={activeTab}
      name={name}
      description={description}
      socialLinks={socialLinks}
      balance={22.00}
      transactions={mockTransactions}
      orders={mockOrders}
      onTabChange={setActiveTab}
      onNameChange={setName}
      onDescriptionChange={setDescription}
      onSocialLinkChange={handleSocialLinkChange}
      onSaveBasic={() => {}}
      onLogout={signOut}
    />
  );
}
