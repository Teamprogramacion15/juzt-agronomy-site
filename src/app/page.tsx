import { HomeHero } from "@/components/sections/HomeHero";
import { EpseaCredential } from "@/components/sections/EpseaCredential";
import { ImpactNumbers } from "@/components/sections/ImpactNumbers";
import { HomeReform } from "@/components/sections/HomeReform";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <EpseaCredential />
      <ImpactNumbers />
      <HomeReform />
    </>
  );
}
