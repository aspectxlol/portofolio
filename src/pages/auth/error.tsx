import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();
  const { error } = router.query as { error: string };
  
  return (
    <main className="flex flex-col justify-center w-full h-dvh">
      <div>
        <h1 className="text-center text-3xl md:text-7xl font-bold max-w-2xl">We Encountered an Error while Authenticating you</h1>
        <p className="text-center">Error Context: {error}</p>
        <div className="flex flex-col justify-center items-center ">
          <Button onClick={() => {location.href = `mailto:gamernxt6@gmail.com?subject=Error%20while%20Authenticating%20a%20user&body=Error+Context%3A+%20${error}`}}>Report to the Developer</Button>
        </div>
      </div>
    </main>
  )
}

/**
 * <a href="mailto:name1@rapidtables.com?
 * cc=name2@rapidtables.com&
 * bcc=name3@rapidtables.com&
 * subject=The%20subject%20of%20the%20email
 * &body=The%20body%20of%20the%20email">
Send mail with cc, bcc, subject and body</a>
 */