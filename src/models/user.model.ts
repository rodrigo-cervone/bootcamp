export class UserEntity   {
  constructor(
    public login: string,
    public name: string,
    public company: string,
    public blog: string,
    public avatar_url: string,
    public public_repos: number,
    public public_gists: number,
    public followers: number,
    public following: number,
    public repos_url: string
  ) {  }
}

export interface User extends UserEntity{

}
