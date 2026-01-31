import { SettingsHistoryTemplate } from "@/components/templates";
import { mockOrders } from "@/data";
import { useSettings } from "../useSettings";

export const HistorySettings = () => {
  const { onLogout, profile } = useSettings();

  return (
    <SettingsHistoryTemplate
      name={profile?.name}
      username={profile?.name}
      orders={mockOrders}
      onLogout={onLogout}
    />
  );
};
