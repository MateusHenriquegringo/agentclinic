import {html} from "hono/html";

export const Main = (children: any) => html`
    <main>
        ${children}
    </main>
`