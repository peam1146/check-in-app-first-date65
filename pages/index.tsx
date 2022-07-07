import Link from "next/link";
import { Button, Table } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../common/firebase/init";
import { Person } from "../common/types/person";

export default function Demo() {
  const [data, setData] = useState<Person[]>();

  useEffect(() => {
    const unsub = setup();
    return () => unsub();
  }, []);

  const setup = () =>
    onSnapshot(collection(db, "list"), (snap) => {
      setData(snap.docs.map((v) => v.data()) as Person[]);
    });
  return (
    <Table>
      <thead>
        <tr>
          <th>ชื่อเล่น</th>
          <th>ปี</th>
          <th>คณะ</th>
          <th>IG</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((v) => (
          <tr key={v.name}>
            <td>{v.name}</td>
            <td>{v.year}</td>
            <td>{v.major}</td>
            <td>{v.ig}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
