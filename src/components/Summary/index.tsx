import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

export function Summary(){
    const {transactions} = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'income'){
            acc.income += transaction.amout;
            acc.total += transaction.amout;
        } else {
            acc.outcome += transaction.amout;
            acc.total -= transaction.amout;
        }

        return acc
    }, {
        income: 0,
        outcome: 0,
        total: 0
    })
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.income)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(-summary.outcome)}
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}