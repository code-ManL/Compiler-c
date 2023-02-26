import { Download, Sun, Moon, GitHub, Share } from "@src/icons";
import "./index.scss";

import store from "../../store/theme";

function Header() {
  const toggleDark = () => {
    const cls = document.documentElement.classList;

    cls.toggle("dark");
    localStorage.setItem("LiuSeen-prefer-dark", String(cls.contains("dark")));
    cls.value === "dark"
      ? store.dispatch({
          type: "",
        })
      : store.dispatch({
          type: "dark",
        });
  };

  return (
    <nav>
      <h1>
        <span>Compiler-C </span>
      </h1>
      <div className="links">
        <button
          title="Toggle dark mode"
          className="toggle-dark"
          onClick={toggleDark}
        >
          <Sun />
          <Moon />
        </button>
        <button title="Copy sharable URL" className="share">
          <Share />
        </button>
        <button title="Download project files" className="download">
          <Download />
        </button>
        <button title="View on GitHub" className="github">
          <a href="https://github.com/code-ManL" target="_blank">
            <GitHub />
          </a>
        </button>
      </div>
    </nav>
  );
}

export default Header;
