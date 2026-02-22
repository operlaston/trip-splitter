import '../styles/TripPage.css'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getTripById } from '../api/tripService'
import TripMembers from '../components/trip/TripMembers'
import Transactions from '../components/trip/Transactions'

const TripPage = () => {
  const { tripId } = useParams()

  const tripQuery = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => getTripById(tripId)
  })

  if (tripQuery.isPending) {
    return (
      <div className="trip-page-container">
        Loading Trip Data...
      </div>
    )
  }

  else if (tripQuery.isError) {
    console.error(tripQuery.error)
    return (
      <div className="trip-page-container">
        An error has occurred while loading trip with id: {tripId}.
      </div>
    )
  }

  const trip = tripQuery.data

  return (
    <div className="trip-page-container">
      <div className="trip-content-container">
        <h1>{trip.name}</h1>
        <div className="trip-body-container">
          <div className="trip-section-container">
            <Transactions />
          </div>
          <div className="trip-section-container">
            <TripMembers />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripPage
