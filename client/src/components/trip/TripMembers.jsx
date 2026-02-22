import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getTripMembers } from "../../api/tripService"

const TripMembers = () => {
  const { tripId } = useParams()

  const tripMembersQuery = useQuery({
    queryKey: ['tripMembers', tripId],
    queryFn: () => getTripMembers(tripId)
  })

  if (tripMembersQuery.isPending) {
    return (
      <>
        <h2>
          Trip Members
        </h2>
        <div>
          Loading Trip Members...
        </div>
      </>
    )
  }

  else if (tripMembersQuery.isError) {
    console.error(tripMembersQuery.error)
    return (
      <>
        <h2>
          Trip Members
        </h2>
        <div className="login-error">
          An error has occurred while loading trip members.
        </div>
      </>
    )
  }

  const tripMembers = tripMembersQuery.data

  return (
    <>
      <h2>
        Trip Members
      </h2>
      {
        tripMembers.map(member => {
          const dateObj = new Date(member.joined_at);
          const dateJoined = dateObj.toDateString();
          return (
            <div key={member.user_id}>
              {member.name} ({member.username}) <span className="member-join-date">Joined: {dateJoined}</span>
            </div>
          )
        })
      }
    </>
  )

}

export default TripMembers

