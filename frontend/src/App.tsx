import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

const Botonera: React.FC<{ user: string }> = ({ user }) => {
  const [text, setText] = useState<string | undefined>();
  const [so, setSo] = useState<Socket | undefined>();

  useEffect(() => {
    if (!so) {
      const socket = io("http://192.168.0.193:3001", { query: { user } });

      socket.on("connect", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });

      socket.on("disconnect", () => {
        console.log(socket.id); // undefined
      });

      socket.on("file-transfer", (data) => {
        // Create a new Blob from the received data
        const blob = new Blob([data.filedata], {
          type: "application/octet-stream",
        });

        const src = URL.createObjectURL(blob);

        // Create an audio element and set its source to the Blob URL
        const audio = new Audio(src);

        // Play the audio
        audio
          .play()
          .then(() => {
            console.log("Playback started!");
          })
          .catch((error) => {
            console.error("Error playing the audio file:", error);
          });

        // Optional: Revoke the object URL after playback to release memory
        audio.onended = () => {
          URL.revokeObjectURL(src);
        };
      });

      setSo(socket);
    }
  }, [so, user]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
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
        {/* <Button
          className="text-[30px]"
          onClick={() =>
            fetch("http://192.168.0.193:3000/can-i-pet", { method: "POST" })
          }
        >
          Pet
          <br />
          that daw
        </Button> */}
        <Button
          className="text-[30px]"
          onClick={() =>
            fetch("http://192.168.0.193:3000/so-tired", { method: "POST" })
          }
        >
          Estoy
          <br />
          cansado jefe
        </Button>
        <Button
          className="text-[30px]"
          onClick={() =>
            fetch("http://192.168.0.193:3000/two-balls", { method: "POST" })
          }
        >
          Dos bolitas
        </Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://192.168.0.193:3000/text-to-speech", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: `${user} dice ${text}`,
            }),
          });
        }}
      >
        <input
          placeholder="Ingrese su mensaje y precione enter"
          className="w-[328px] h-[40px] p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" hidden />
      </form>
    </>
  );
};

const LogIn: React.FC<{
  setUser: (user: string) => void;
}> = ({ setUser }) => {
  const [text, setText] = useState<string | undefined>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (text) {
          setUser(text);
        }
      }}
    >
      <h1 className="text-2xl mb-8">Hola papu, por favor dime quien eres</h1>
      <input
        placeholder="Ingrese su nombre"
        className="w-[328px] h-[40px] p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type="submit" hidden />
    </form>
  );
};

function App() {
  const [user, setUser] = useState<string | undefined>();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        {user ? <Botonera user={user} /> : <LogIn setUser={setUser} />}
      </div>
    </>
  );
}

export default App;
