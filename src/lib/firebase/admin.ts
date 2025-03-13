import { db } from './config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserRole {
  isAdmin: boolean;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export async function checkUserRole(userId: string): Promise<UserRole | null> {
  try {
    const userRoleDoc = await getDoc(doc(db, 'userRoles', userId));
    if (userRoleDoc.exists()) {
      return userRoleDoc.data() as UserRole;
    }
    return null;
  } catch (error) {
    console.error('Error checking user role:', error);
    return null;
  }
}

export async function setUserAsAdmin(userId: string): Promise<boolean> {
  try {
    const now = new Date();
    await setDoc(doc(db, 'userRoles', userId), {
      isAdmin: true,
      role: 'admin',
      createdAt: now,
      updatedAt: now,
    });
    return true;
  } catch (error) {
    console.error('Error setting user as admin:', error);
    return false;
  }
}

export async function removeAdminRole(userId: string): Promise<boolean> {
  try {
    const now = new Date();
    await setDoc(doc(db, 'userRoles', userId), {
      isAdmin: false,
      role: 'user',
      updatedAt: now,
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error removing admin role:', error);
    return false;
  }
} 