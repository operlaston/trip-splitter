import useTrip from "../../store/tripStore"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"

const NewTransaction = () => {
  const { tripId } = useParams()
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    splitType: "Evenly"
  })
  const setIsCreatingTransaction = useTrip(state => state.setIsCreatingTransaction)
  const queryClient = useQueryClient()
  const trip = queryClient.getQueryData(['trip', tripId])

  const handleChange = (e) => {
    setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="new-transaction-modal-container">
      <form className="new-transaction-form" onSubmit={handleSubmit}>
        <div>
          <span className="new-transaction-back" onClick={() => setIsCreatingTransaction(false)}>&larr;</span>
        </div>
        <h2>New Transaction</h2>
        <div className="new-transaction-label-input">
          <label for="tactn-desc">Description</label>
          <input id="tactn-desc" type="text" placeholder="What is this transaction for?" name="description" onChange={handleChange} value={formData.description}/>
        </div>
        <div className="new-transaction-label-input">
          <label for="tactn-amount">Amount</label>
          <div className="new-transaction-amount-input-container">
            <div className="new-transaction-currency">{trip.target_currency}</div>
            <input id="tactn-amount" type="text" placeholder="How much did you pay?" name="amount" onChange={handleChange} value={formData.amount}/>
          </div>
        </div>
        <div className="new-transaction-label-input">
          <label for="tactn-split-options">How do you want to split this transaction?</label>
          <select id="tactn-split-options" name="splitType" onChange={handleChange} value={formData.splitType}>
            <option value="Evenly">Evenly</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <button className="add-transaction-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default NewTransaction
