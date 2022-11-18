import "./styles.css";
import { router } from "./app/app.routing.module";

router(window.location.hash);

window.addEventListener("hashchange", e => {
    router(window.location.hash);
});