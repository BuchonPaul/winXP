import { Button, Flex } from "@radix-ui/themes";
import "./Footer.css";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../data/WindowsContext.jsx";
import Menu from "../menu/Menu.jsx";

export default function Footer({ toogleMenu, menuOpen }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date());
    }, 1000);
  }, [date]);
  const { toogleWindow, windows } = useAppContext();

  return (
    <>
      <Flex className="footerContainer">
        <Button className="mainButton" onClick={() => toogleMenu()}>
          <img src="/logo.png" width="25px" height="25px" />
          Action
        </Button>

        <Flex className="footerApp">
          {windows.map((item) => {
            return (
              <Button
                key={item.id}
                className="appButton"
                style={{
                  backgroundColor: item.isShow
                    ? "rgb(60, 129, 243)"
                    : "transparent",
                }}
                onClick={() => {
                  toogleWindow(item.id);
                }}
              >
                <img className="windowLogo" src={item.icon} />
                <div>{item.title}</div>
              </Button>
            );
          })}
        </Flex>
        <Button className="footerTool">
          {(date.getHours() < 10 ? "0" : "") + date.getHours()}:
          {(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}{" "}
          {date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </Button>
      </Flex>
      <Menu menuOpen={menuOpen} />
    </>
  );
}
