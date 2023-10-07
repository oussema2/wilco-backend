const admin = require("firebase-admin");
const firebaseApp = require("../fireBaseConfig").firebaseApp;
const Pilot = require("../db/models/pilot");
const Notification = require("../db/models/notification");
const pushNotification = async (tokens, message) => {
  // Send a message to the device corresponding to the provided
  // registration token.
  const resMessaging = await admin.messaging().sendMulticast({
    tokens: tokens,
    notification: message,
  });
  console.log(resMessaging);
  if (resMessaging) {
    return {
      success: resMessaging.responses[0].success,
    };
  }
};

exports.pushNotificationForOne = async (
  notification_DB,
  notification_FB,
  pilot_id
) => {
  const notification = new Notification(notification_DB);

  const resAddNotification = await notification.save();
  if (resAddNotification) {
    const pilotsRes = await Pilot.findById(pilot_id);

    if (pilotsRes) {
      const resNotification_FB = await pushNotification(
        [pilotsRes.device_token],
        notification_FB
      );
      if (resNotification_FB) {
        return {
          ok: resNotification_FB.success,
          notification: { resNotification_FB, resAddNotification },
        };
      }
    }
  }
};

exports.pushNotificationForMany = async (
  notifications_DB,
  notification_FB,
  pilots_id
) => {
  try {
    const notificationInsertRes = await Notification.insertMany(
      notifications_DB
    );

    if (notificationInsertRes) {
      const pilotsRes = await Pilot.find({ _id: { $in: pilots_id } });

      if (pilotsRes) {
        const resNotification_FB = await pushNotification(
          pilotsRes.map((el) => el.device_token),
          notification_FB
        );

        if (resNotification_FB) {
          console.log("reached notif");

          return {
            ok: resNotification_FB.success,
            notification: { resNotification_FB, notificationInsertRes },
          };
        }
      }
    }
  } catch (error) {
    console.log(err);
    return {
      ok: false,
      err: err,
    };
  }
};
