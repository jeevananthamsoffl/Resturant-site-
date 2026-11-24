import { Request, Response } from 'express';
import { ReservationService } from '../services/reservation.service';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../types';

export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const { date, timeSlot } = req.query;
    if (!date || !timeSlot) {
      return sendError(res, 'Both date and timeSlot query parameters are required', 400);
    }
    const isAvailable = await ReservationService.checkAvailability(
      date as string,
      timeSlot as string
    );
    return sendSuccess(res, 'Availability status checked', { isAvailable });
  } catch (error: any) {
    return sendError(res, error.message || 'Availability check failed', 400);
  }
};

export const createReservation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reservation = await ReservationService.create({
      ...req.body,
      userId: req.user?.id,
    });
    return sendSuccess(res, 'Table reservation confirmed successfully', reservation, 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Reservation booking failed', 400);
  }
};

export const getReservationByCode = async (req: Request, res: Response) => {
  try {
    const reservation = await ReservationService.getByCode(req.params.code);
    return sendSuccess(res, 'Reservation retrieved successfully', reservation);
  } catch (error: any) {
    return sendError(res, error.message || 'Reservation not found', 404);
  }
};

export const getUserReservations = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reservations = await ReservationService.getUserReservations(
      req.user?.id,
      req.user?.email || (req.query.email as string)
    );
    return sendSuccess(res, 'Guest reservations retrieved', reservations);
  } catch (error: any) {
    return sendError(res, error.message || 'Could not retrieve reservations', 500);
  }
};

export const cancelReservation = async (req: Request, res: Response) => {
  try {
    const cancelled = await ReservationService.cancel(req.params.code, req.body.reason);
    return sendSuccess(res, 'Reservation cancelled successfully', cancelled);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to cancel reservation', 400);
  }
};
