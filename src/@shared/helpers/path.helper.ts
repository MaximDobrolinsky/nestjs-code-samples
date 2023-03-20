import { Types } from 'mongoose';

const getExtensionFromFilename = (filename) => filename.split('.').pop();

const generateFilename = () => new Types.ObjectId().toString();

export const generateSkillImagePath = (filename: string) =>
  filename
    ? `assets/images/skills/${generateFilename()}.${getExtensionFromFilename(
        filename,
      )}`
    : null;

export const generateInterviewersImagePath = (filename: string) =>
  filename
    ? `assets/images/interviewers/${generateFilename()}.${getExtensionFromFilename(
        filename,
      )}`
    : null;

export const generateProfilesImagePath = (filename: string) =>
  filename
    ? `assets/images/profiles/${generateFilename()}.${getExtensionFromFilename(
        filename,
      )}`
    : null;
