import { redirect } from "next/navigation";
import { Container, Grid } from "@mui/material";
import { getAuthUser } from "@/lib/auth";

// Components
import AddProjectCard from "./components/AddProjectCard";
import OverviewCards from "./components/OverviewCards";
import TaskList from "./components/TaskList";
import ProjectList from "./components/ProjectList";
import AiSummaryCard from "./components/AiSummaryCard";
import AiChatWidget from "./components/AiChatWidget";

export default async function DashboardPage() {
  const user = getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Top Overview */}
      <OverviewCards />

      {/* Main Grid */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Left column */}
        <Grid size={{xs: 12, md:8}} container direction="column" spacing={3}>
          <Grid>
            <TaskList />
          </Grid>
          <Grid>
            <AddProjectCard />
          </Grid>
          <Grid>
            <ProjectList />
          </Grid>
        </Grid>

        {/* Right column */}
        <Grid size={{xs:12, md:4}} container direction="column" spacing={3}>
          <Grid>
            <AiSummaryCard />
          </Grid>
          <Grid>
            <AiChatWidget />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
