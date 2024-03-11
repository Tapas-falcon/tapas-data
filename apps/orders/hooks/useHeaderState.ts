import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { headerState } from "@/state/atoms";

type HeaderState = {
  title: string,
  showBack?: boolean,
  showSearch?: boolean,
}
export function useHeaderState({
  title,
  showBack = false,
  showSearch = true,
}: HeaderState) {
  const [header, setHeader] = useRecoilState(headerState)

  useEffect(() => {
    setHeader({
      title,
      showBack,
      showSearch
    })
  }, [])

  return header
}