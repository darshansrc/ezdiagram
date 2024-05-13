"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("21993c54-f504-4197-b8ed-e82993cd9969");
  });

  return null;
};

export default CrispChat;
