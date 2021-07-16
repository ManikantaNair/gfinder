import React from 'react';
import ReposItems from './ReposItems';

const Repos = ({repos})=>{
 

  return repos.map(repo =>
    <ReposItems repo={repo} key={repo.id}/> )

}

export default Repos;