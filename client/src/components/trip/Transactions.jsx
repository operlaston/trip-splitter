import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getTransactions } from "../../api/tripService"

const Transactions = () => {
  const { tripId } = useParams()

  const transactionsQuery = useQuery({
    queryKey: ['transactions', tripId],
    queryFn: () => getTransactions(tripId)
  })

  if (transactionsQuery.isPending) {
    return (
      <>
        <h2>
          Trip Members
        </h2>
        <div>
          Loading Transactions...
        </div>
      </>
    )
  }

  else if (transactionsQuery.isError) {
    console.error(transactionsQuery.error)
    return (
      <>
        <h2>
          Trip Members
        </h2>
        <div className="login-error">
          An error has occurred while loading transactions.
        </div>
      </>
    )
  }

  return (
    <>
      <h2>
        Transactions
      </h2>
      {
        transactionsQuery.data.length === 0
          ? <div>This trip does not yet have any transactions</div>
          :
          transactionsQuery.data.map(transaction => {
            const dateObj = new Date(transaction.created_at);
            {/* const dateCreated = dateObj.toDateString(); */ }
            return (
              <div>
                {transaction.paying_user_name} ({transaction.paying_user_username}) paid {transaction.amount_paid} on {dateObj}
              </div>
            )
          })
      }
    </>
  )
}

export default Transactions
