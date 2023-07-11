import React from 'react';
import Loader from './Loader';

const About = () => {
  return (
    <div className="h-fit pt-20 flex-grow">
      <div className="px-16 my-8">
        <div className="bg-gray-200 h-fit rounded-2xl p-4">
          <div className=" border-b  py-2 bg-gray-300 rounded-xl p-4 mb-4">
            <p className="text-2xl text-gray-800 py-2 font-semibold ">
              NFT govern DAO
            </p>
            <p className="text-justify">
              {' '}
              An NFT Governed DAO is a decentralized autonomous organization
              that leverages non-fungible tokens (NFTs) as a means of
              governance. NFT holders have voting rights within the DAO, with
              each NFT acting as a voting token. This unique approach
              incentivizes participation and aligns the interests of
              stakeholders. NFTs can also represent assets or collateral, such
              as fractional ownership of real-world assets or virtual assets
              within a metaverse, adding a financial dimension to the DAO
              ecosystem. By combining blockchain transparency and NFT
              uniqueness, NFT Governed DAOs empower individuals to actively
              contribute to decision-making and value creation, fostering a
              community-driven and inclusive governance model.
            </p>
            <p className="font-semibold text-gray-700 text-xl mt-2">
              1. Governance Process:
            </p>
            <p>
              Describe how proposals are submitted, reviewed, and voted upon
              within the DAO. Explain the decision-making process and how the
              results are determined.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              2. Token Distribution:
            </p>
            <p>
              Provide information on how NFTs are distributed within the DAO.
              Explain whether they are sold, airdropped, or obtained through
              other means.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              3. Roles and Responsibilities:
            </p>
            <p>
              Outline the roles and responsibilities of different participants
              within the DAO, such as the owner, NFT holders, and community
              members.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              4. DAO Roadmap:
            </p>
            <p>
              Share the future plans and vision for the DAO. Discuss potential
              features, improvements, or collaborations that are planned.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              5. Community Engagement:
            </p>
            <p>
              Highlight the importance of community engagement and participation
              in shaping the direction of the DAO. Encourage users to actively
              contribute their ideas, feedback, and proposals.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              6. Transparency and Security:
            </p>
            <p>
              Emphasize the transparent and secure nature of the DAO. Explain
              how blockchain technology ensures transparency, immutability, and
              the security of transactions.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              7. Rewards and Incentives:
            </p>
            <p>
              Discuss any rewards or incentives offered to participants within
              the DAO. This can include benefits for voting, holding NFTs, or
              contributing to the ecosystem.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              8. Support and Documentation:
            </p>
            <p>
              Provide information on how users can seek support or access
              documentation related to the DAO. Include links to relevant
              resources, FAQs, or community forums.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              9. Social Channels:
            </p>
            <p>
              Mention any official social media channels or community platforms
              where users can connect, collaborate, and stay updated on
              DAO-related news and discussions.
            </p>

            <p className="font-semibold text-gray-700 text-xl mt-2">
              10. Compliance and Legal Considerations:
            </p>
            <p>
              If applicable, mention any compliance measures or legal
              considerations that the DAO adheres to, such as regulatory
              requirements or intellectual property rights.
            </p>
          </div>
          <div className=" py-2 bg-gray-300 rounded-xl p-4 mb-4">
            <p className="text-2xl font-semibold text-gray-700 py-2">Role</p>
            <p>Owner</p>
            <p>Stake Holder</p>
          </div>
          <div className="py-4 bg-gray-300 rounded-xl p-4 mb-4">
            <p className=" text-gray-700 font-semibold py-2 text-2xl">Rules</p>
            <p>
              &bull; Only the contract owner can create proposals and manage the
              DAO.
            </p>
            <p>
              &bull; Each NFT holder has voting rights and can cast votes on
              proposals.
            </p>
            <p>&bull; Proposals must have a title and description.</p>
            <p>
              &bull; The DAO has a maximum supply of NFTs that can be minted.
            </p>
            <p>
              &bull; To buy an NFT, users need to send the specified stack price
              in Ether.
            </p>
            <p>&bull; Users can only own one NFT in the DAO.</p>
            <p>
              &bull; Once a proposal is closed, the voting results are
              calculated.
            </p>
            <p>
              &bull; To pass a proposal, the number of "yes" votes must be
              greater than the number of "no" votes.
            </p>
            <p>
              &bull; The DAO owner can withdraw the Ether balance from the
              contract.
            </p>
            <p>
              &bull; The DAO owner can airdrop NFTs to specified recipients
              within the maximum supply limit.
            </p>
            <p>
              &bull; Proposals must be created by the DAO owner and cannot be
              modified once submitted.
            </p>
            <p>
              &bull; NFT holders can participate in voting for multiple
              proposals simultaneously.
            </p>
            <p>
              &bull; The DAO owner can increase the total supply of NFTs, but it
              must be more than zero.
            </p>
            <p>
              &bull; The DAO operates on a decentralized network, ensuring
              transparency and immutability.
            </p>
            <p>
              &bull; All NFTs minted within the DAO have a unique token URI
              associated with them.
            </p>
            <p>
              &bull; The DAO follows a community-driven governance model,
              allowing NFT holders to propose changes and improvements.
            </p>
            <p>
              &bull; Proposals that fail to meet the required votes are
              considered rejected and cannot be implemented.
            </p>
            <p>
              &bull; The DAO owner can specify a specific token URI for all NFTs
              minted within the DAO.
            </p>
            <p>
              &bull; NFT holders can transfer their tokens to other addresses
              within the DAO.
            </p>
            <p>
              &bull; The DAO aims to foster collaboration and innovation within
              the NFT ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
