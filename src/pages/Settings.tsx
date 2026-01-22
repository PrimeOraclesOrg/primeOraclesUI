import { useState } from "react";
import { SettingsTemplate } from "@/components/templates";
import { mockTransactions, mockOrders, mockSocialLinks } from "@/data/transactions";
import { signOut } from "@/services";
import { useNavigate } from "react-router-dom";
import { selectAuthProfile, useAppSelector } from "@/store";

type SettingsTab = "basic" | "security" | "balance" | "history";

export default function Settings() {
  const profile = useAppSelector(selectAuthProfile);
  const [activeTab, setActiveTab] = useState<SettingsTab>("basic");
  const [socialLinks, setSocialLinks] = useState(mockSocialLinks);
  const navigate = useNavigate();

  const handleSocialLinkChange = (index: number, url: string) => {
    const newLinks = [...socialLinks];
    newLinks[index].link = url;
    setSocialLinks(newLinks);
  };

  const onLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <SettingsTemplate
      activeTab={activeTab}
      name={profile?.name}
      username={profile?.username}
      description={profile?.bio}
      socialLinks={socialLinks}
      balance={22.0}
      transactions={mockTransactions}
      orders={mockOrders}
      onTabChange={setActiveTab}
      onNameChange={() => {}}
      onDescriptionChange={() => {}}
      onSocialLinkChange={handleSocialLinkChange}
      onSaveBasic={() => {}}
      onLogout={onLogout}
    />
  );
}
