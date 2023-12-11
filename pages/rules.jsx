import Nav from "@/components/Nav";
import { firestore, auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Rules = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);
  return (
    <div className="wrapper prose dark:prose-invert">
      {user && <Nav />}
      <h1 className="text-center">Lake House Reservations</h1>
      <section className="mx-auto w-1/2">
        <ol>
          <li>
            Occupancy:
            <ul>
              <li>The maximum occupancy is 16.</li>
              <li>
                All guests, including children, must be included in the
                reservation.
              </li>
            </ul>
          </li>
          <li>
            House Rules:
            <ul>
              <li>No smoking is allowed inside the house.</li>
              <li>Pets are fine as long as you clean up after them.</li>
              <li>
                Guests are expected to respect the neighborhood and keep noise
                levels to a minimum, especially during quiet hours (typically
                after 10pm).
              </li>
            </ul>
          </li>
          <li>
            Cleaning and Maintenance:
            <ul>
              <li>
                Guests are responsible for maintaining the property in a clean
                and sanitary condition.
              </li>
              <li>
                The house is to be completely cleaned. This includes:
                <ul>
                  <li>Dishes</li>
                  <li>Linens</li>
                  <li>Trash</li>
                  <li>Wharf</li>
                </ul>
              </li>
              <li>Report any damages or issues immediately to the parents.</li>
            </ul>
          </li>
          <li>
            Kitchen Use:
            <ul>
              <li>
                Guests are responsible for cleaning dishes and cookware used
                during their stay.
              </li>
              <li>
                Dispose of trash properly and follow local recycling guidelines.
              </li>
            </ul>
          </li>
          <li>
            Appliances and Utilities:
            <ul>
              <li>
                Use appliances and utilities (air conditioning, heating, etc.)
                responsibly and turn them off when not in use.
              </li>
              <li>
                Do not tamper with or attempt to repair any appliances. Report
                malfunctions promptly.
              </li>
              <li>Turn off all appliances prior to leaving.</li>
            </ul>
          </li>
          <li>
            Security and Entry:
            <ul>
              <li>Keep doors and windows locked when not on the premises.</li>
              <li>
                Do not provide access to the property to unauthorized
                individuals.
              </li>
            </ul>
          </li>
          <li>
            Parking:
            <ul>
              <li>
                Park in the drive way, if you nedd additional parking, utilize
                the area on the backside of the property, please keep the side
                alley and street clear
              </li>
            </ul>
          </li>
          <li>
            Internet and Electronics:
            <ul>
              <li>
                Respect bandwidth limitations, and do not engage in illegal
                downloading or streaming activities.
              </li>
              <li>
                Do not tamper with or reconfigure electronic devices provided.
              </li>
            </ul>
          </li>
          <li>
            Emergencies:
            <ul>
              <li>
                Familiarize yourself with the emergency procedures and contact
                information for local authorities.
              </li>
            </ul>
          </li>
          <li>
            Environmental Responsibility:
            <ul>
              <li>
                Conserve energy by turning off lights, appliances, and air
                conditioning when not needed.
              </li>
              <li>
                Follow any eco-friendly practices specified for the property.
              </li>
            </ul>
          </li>
          <li>
            Compliance with Laws:
            <ul>
              <li>Guests must comply with all local laws and regulations.</li>
            </ul>
          </li>
          <li>
            Last Day:
            <ul>
              <li>
                Leave the property in the same condition it was found, with
                furniture and items returned to their original places.
              </li>
              <li>Return keys as instructed.</li>
            </ul>
          </li>
          Failure to comply with these rules may result in not being able to use
          the property without the parents present.
        </ol>
      </section>
    </div>
  );
};
export default Rules;
