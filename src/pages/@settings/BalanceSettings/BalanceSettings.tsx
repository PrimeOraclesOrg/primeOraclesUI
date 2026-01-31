import { SettingsBalanceTemplate } from "@/components/templates";
import { useSettings } from "../useSettings";
import { mockTransactions } from "@/data";

export const BalanceSettings = () => {
  const { onLogout, profile } = useSettings();

  return (
    <SettingsBalanceTemplate
      balance={0}
      name={profile?.name}
      username={profile?.username}
      transactions={mockTransactions}
      onLogout={onLogout}
    />
  );
};
