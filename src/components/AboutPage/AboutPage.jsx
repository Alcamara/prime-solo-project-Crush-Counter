import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>Duration of Sprint:  <i>2 Weeks</i> </h2>
      <h2>Technologies Used:</h2>
      <ul>
        <li>React</li>
        <li>Express</li>
        <li>Redux</li>
        <li>Redux-Saga</li>
        <li>Material UI</li>
        <li>Postgres</li>
        <li>Start.gg Api</li>
      </ul>
      <h2>Cool Challenges</h2>
      <ul><li> GraphQL</li></ul>

      <h2>What Do I want to work on next?</h2>
      <ol>
        <li>Add comments section to tournament details page.</li>
        <li>In app chat functionality</li>
      </ol>

      <h2>Special Thanks to:</h2>
      <ol>
        <li>Prime Digital Academy</li>
        <li>Edan</li>
        <li>Gaiman Cohort</li>
        <li>friends & family</li>
        <li>Finace</li>
      </ol>
      
      </div>
    </div>
  );
}

export default AboutPage;
