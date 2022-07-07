import { Button, Group, NumberInput, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { addDoc } from "firebase/firestore";
import { Person } from "../common/types/person";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../common/firebase/init";

const Checkin = () => {
  const form = useForm({
    initialValues: {
      name: "",
      year: 0,
      major: "",
      ig: "",
    },
  });

  const onSubmit = async (v: Person) => {
    const docRef = await addDoc(collection(db, "list"), {
      ...v,
    });
    window.location.href = "/";
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Paper
        shadow="xs"
        p="md"
        sx={() => ({ maxWidth: "400px", width: "100%" })}
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            required
            label="ชื่อเล่น"
            {...form.getInputProps("name")}
          />
          <NumberInput required label="ปี" {...form.getInputProps("year")} />
          <TextInput required label="คณะ" {...form.getInputProps("major")} />
          <TextInput label="IG" {...form.getInputProps("ig")} />
          <Group position="right" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default Checkin;
