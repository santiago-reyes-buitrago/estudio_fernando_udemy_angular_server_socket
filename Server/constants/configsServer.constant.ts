import bodyParser from "body-parser";
import cors from "cors";

export const configsServerConstant = [
    bodyParser.urlencoded({extended: true}),bodyParser.json(),cors({origin: true, credentials: true})
]