import { useState } from "react";
import { Button } from "./components/Button";

function App() {
  const [text, setText] = useState<string | undefined>();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-wrap">
          <Button
            className="text-[30px]"
            onClick={() =>
              fetch("http://192.168.0.193:3000/hambre", { method: "POST" })
            }
          >
            Tengo mucha
            <br /> hambre
          </Button>
          <Button
            className="text-[30px]"
            onClick={() =>
              fetch("http://192.168.0.193:3000/macaco", { method: "POST" })
            }
          >
            Alerta
            <br /> do MACACO
          </Button>
          <Button
            className="text-[30px]"
            onClick={() =>
              fetch("http://192.168.0.193:3000/can-i-pet", { method: "POST" })
            }
          >
            Pet
            <br />
            that daw
          </Button>
          <Button
            className="text-[30px]"
            onClick={() =>
              fetch("http://192.168.0.193:3000/text-to-speech", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  text: text,
                }),
              })
            }
          >
            Caricias
          </Button>
        </div>

        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </>
  );
}

export default App;
