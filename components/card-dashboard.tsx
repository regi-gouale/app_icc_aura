import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardDashboard(props: {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
}) {
  const { title, value, description, icon } = props;
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
