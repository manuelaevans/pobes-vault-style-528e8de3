import logo from "@/assets/pobes-vault-monogram.png";

export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Pobe's Vault PV monogram"
      width={1024}
      height={1024}
      className={className}
    />
  );
}