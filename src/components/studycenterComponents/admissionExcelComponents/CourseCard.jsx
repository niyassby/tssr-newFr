import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { formatDateOnly } from "@/lib/formateDate";

export function CourseCard({ batch, onIndividual, setCourse, onBulk }) {
  const courseDetails = batch?.courseId;
  const { name, category, duration } = courseDetails;
  function handleEnroll() {
    setCourse({
      courseId: courseDetails._id,
      batchId: batch._id,
    });
    onIndividual();
  }
  function handleEnrollBuld() {
    setCourse({
      courseId: courseDetails._id,
      batchId: batch._id,
    });
    onBulk();
  }
  return (
    <Card className="w-full  bg-background pt-0 rounded-2xl shadow-none transition-all hover:shadow-md">
      <CardHeader className="bg-primary text-white rounded-t-2xl p-5">
        <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
          {name}
        </CardTitle>
        <CardDescription className="text-white/80  text-sm">
          Boost your skills in {category} domain.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Category</span>
          <span className=" font-semibold">{category}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Duration</span>
          <span className=" font-semibold">{duration}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Batch</span>
          <span className=" font-bold text-lg">{batch.month}</span>
        </div>
        <div className="mt-2 text-muted-foreground flex text-sm justify-between">
          <span className="text-muted-foreground font-medium">Last Date</span>
          <span className="font-medium text-primary text-sm">
            {formatDateOnly(batch.endDate, "PPP")}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t grid grid-cols-2 gap-2">
        <Button className="w-full py-5" onClick={handleEnroll}>
          Single Enroll
        </Button>
        <Button onClick={handleEnrollBuld} variant="outline" className="w-full py-5">
          Bulk Enroll
        </Button>
      </CardFooter>
    </Card>
  );
}
