import { useState, useEffect, useCallback } from 'react';
import { Customer, Deal, SupportTicket, Invoice } from '@nexus/shared';
import { ApiClient } from '../services/ApiClient';

// 1. useCustomers Hook
export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await ApiClient.get<{ data: Customer[] }>('/customers');
      setCustomers(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch customers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, isLoading, error, refetch: fetchCustomers };
}

// 2. useDeals Hook
export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await ApiClient.get<any[]>('/deals/pipeline');
      const flatDeals = res.flatMap((stage) => stage.deals || []);
      setDeals(flatDeals);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch deals');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return { deals, isLoading, error, refetch: fetchDeals };
}

// 3. useDebounce Hook
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
