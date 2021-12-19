// Check what production were in quickly.
const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
export default function isDev(): boolean {
  console.log("Is dev run and found that the current process in in the mode:" + development);
  return development;
}
