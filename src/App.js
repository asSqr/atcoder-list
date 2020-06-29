import React from 'react';
import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import './App.css';

const colors = {
  white: "rgba(250, 250, 250, 1.0)",
  gray: "rgba(0, 0, 0, 0.75)"
};

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  padding: 0.9rem;
  box-sizing: border-box;
  padding-left: 1.1rem;
  background: ${colors.white};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledIFrame = styled.iframe`
  width: 70vw;
  height: 70vh;
  margin-top: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

function App() {
  const [user_id, set_user_id] = React.useState(undefined);
  const [submissions, set_submissions] = React.useState([]);

  const fetch_user_submissions = async () => {
    try {
      const fetch_url = `https://kenkoooo.com/atcoder/atcoder-api/results?user=${user_id}`;
      const res = await fetch(fetch_url);
      let user_submissions = await res.json();

      console.log(user_submissions);
      console.log(user_id);

      user_submissions.sort( (a, b) => b.epoch_second - a.epoch_second );
      user_submissions = user_submissions.splice( 0, 20 );

      set_submissions(user_submissions);
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <Header>
        AtCoder User Submission List (ver. α)

        <input type="text" onChange={e => set_user_id(e.target.value)}></input>

        <Button onClick={async () => { await fetch_user_submissions(); }}>Fetch User Submissons</Button>
      </Header>

      {submissions ? submissions.map( (sub, idx) => (
        <StyledIFrame
          title={`${sub.problem_id}`}
          src={`https://atcoder.jp/contests/${sub.contest_id}/tasks/${sub.problem_id}`}
          key={idx}
        />
       )) : (<div>Loading...</div>)}
    </Wrapper>
  );
}

export default App;
