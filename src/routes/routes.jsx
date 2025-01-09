import RagisterCandidate from "../pages/candidate/RagisterCandidate"
import RagisterVoter from '../pages/voter/RagisterVoter'
import GetVoterList from '../pages/voter/GetVoterList'
import GetCandidateList from "../pages/candidate/getCandidateList"
import ElectionCommision from "../pages/ElectionCommision/ElectionCommision"
import Wallet from "../component/Wallet/wallet"
import { createBrowserRouter } from "react-router-dom"


export const routes = createBrowserRouter([
    {
        path:"/",
        element:<Wallet></Wallet>

    },
        {
          path: "RegisterVoter",
          element: <RagisterVoter />,
        },
        {
          path: "RagisterCandidate",
          element: <RagisterCandidate />,
        },
        {
          path: "GetVoterList",
          element: <GetVoterList />,
        },
        {
          path: "GetCandidateList",
          element: <GetCandidateList />,
        },
        {
          path: "ElectionCommision",
          element: <ElectionCommision />,
        },

    ,])