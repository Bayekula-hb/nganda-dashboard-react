

const Dashboard = ({
    children,
    params
  }: Readonly<{
    children: React.ReactNode;  
    params: { userName: string }
  }>) => {

    return(
        <div>
            Dashboard : {params.userName}
        </div>
    )
}
export default Dashboard