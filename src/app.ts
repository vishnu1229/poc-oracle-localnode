import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import { IData } from "./interface/data.interface";

dotenv.config();

const data: IData[] =   [
  {
"loanId": "l1",
"stage2FinanceFee": 100,
"penaltyCommitmentFee": 50,
"penaltyFinanceFee": 75,
"newrepaymentAmount": 500
},
{
"loanId": "l2",
"stage2FinanceFee": 150,
"penaltyCommitmentFee": 25,
"penaltyFinanceFee": 60,
"newrepaymentAmount": 800
}
]

const app = express();
const port = process.env.PORT;


app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(data);
});
console.log("data is",data)
app.get("/:loanId", (req: Request, res: Response, next: NextFunction) => {
  const loan = data.find((item) => item.loanId === req.params.loanId);
  if (loan) {
    res.send(loan);
  } else {
    res.status(404).send("Loan not found");
  }
});

app.post("/", (req: Request, res: Response, next: NextFunction) => {
  const loanExist = data.some((item) => item.loanId === req.body.loanId);
  if (!loanExist) {
    data.push(req.body);
    res.send(req.body);
  } else {
    res.status(400).send("Loan already exists");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
