import { Instagram, Youtube } from "lucide-react";
import type { SocialNetwork } from "@/types";

interface SocialIconProps {
  network: SocialNetwork | string;
  className?: string;
}

export const socialIconMap: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-4 h-4 text-pink-500" />,
  youtube: <Youtube className="w-4 h-4 text-red-500" />,
  tiktok: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
  vk: (
    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.563c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.058-2.763-5.35-2.763-5.823 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.439 2.27 4.574 2.852 4.574.22 0 .322-.102.322-.66V9.793c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.305-.491.745-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"/>
    </svg>
  ),
  x: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

export function SocialIcon({ network, className }: SocialIconProps) {
  const icon = socialIconMap[network];
  
  if (!icon) return null;
  
  return <span className={className}>{icon}</span>;
}

interface SocialIconsProps {
  networks: (SocialNetwork | string)[];
  className?: string;
}

export function SocialIcons({ networks, className }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      {networks.map((network) => (
        <SocialIcon key={network} network={network} />
      ))}
    </div>
  );
}
