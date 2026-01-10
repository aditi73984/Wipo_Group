"use client";

import Button from "@/components/ui/Button";

export default function ActionButton() {
  const handleClick = () => {
    alert("Button clicked");
  };

  return (
    <Button onClick={handleClick}>
      Click
    </Button>
  );
}
