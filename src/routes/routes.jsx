import RagisterCandidate from "../pages/candidate/RagisterCandidate"
import RagisterVoter from '../pages/voter/RagisterVoter'
import GetVoterList from '../pages/voter/GetVoterList'
import GetCandidateList from "../pages/candidate/getCandidateList"
import ElectionCommision from "../pages/ElectionCommision/ElectionCommision"
import Wallet from "../component/Wallet/wallet"
import { createBrowserRouter } from "react-router-dom"
import Navigation from "../component/Navigation/Navigation"


export const routes = createBrowserRouter([
    {
        path:"/",
        element:(
          <div>
        <Wallet></Wallet>
        </div>
      )

    },
        {
          path: "RegisterVoter",
          element: (
            <div>
            <Navigation></Navigation>
          <RagisterVoter></RagisterVoter>
          </div>
        )
        },
        {
          path: "RagisterCandidate",
          element: (
            <div>
            <Navigation></Navigation>
          <RagisterCandidate></RagisterCandidate>
          </div>
        )
        },
        {
          path: "GetVoterList",
          element: (
            <div>
            <Navigation></Navigation>
          <GetVoterList></GetVoterList>
          </div>
        )
        },
        {
          path: "GetCandidateList",
          element:(
            <div>
            <Navigation></Navigation>
          <GetCandidateList></GetCandidateList>
          </div>
        )
        },
        {
          path: "ElectionCommision",
          element:(
            <div>
            <Navigation></Navigation>
          <ElectionCommision></ElectionCommision>
          </div>
        )
        },

    ,])