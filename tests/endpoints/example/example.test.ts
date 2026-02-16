import { describe, it, expect, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { sql } from 'drizzle-orm';

import app from '@/app';
import db from '@/db';
import { exampleSchema } from '@/db/schemas';
import { mockAuthSession } from '~/utils/auth.mock';

async function examplesStub() {
  const fakeExamples = [];

  for (let i = 0; i < 3; i++) {
    fakeExamples.push({ name: faker.person.firstName() });
  }

  const examples = await db.insert(exampleSchema).values(fakeExamples).returning();

  return {
    examples,
  };
}
describe('/api/example', () => {
  beforeEach(async () => {
    await db.execute(sql`TRUNCATE table example RESTART IDENTITY CASCADE`);
  });

  it('GET / returns empty examples array when no items exist', async () => {
    mockAuthSession();

    const res = await app.request('/api/example');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({ examples: [] });
  });

  it('GET / returns list of examples', async () => {
    mockAuthSession();
    const { examples } = await examplesStub();

    const res = await app.request('/api/example');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({ examples: examples });
  });

  it('GET /{id} returns 404 if example does not exist', async () => {
    mockAuthSession();
    const fakeUUID = faker.string.uuid();

    const res = await app.request(`/api/example/${fakeUUID}`);
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body).toEqual({ error: `${fakeUUID} not found` });
  });

  it('GET /{id} returns example', async () => {
    mockAuthSession();
    const { examples } = await examplesStub();

    const res = await app.request(`/api/example/${examples[0].id}`);
    const body = await res.json();

    expect(body).toEqual(examples[0]);
    expect(res.status).toBe(200);
  });

  it('POST / returns 204 when item is successfully created', async () => {
    mockAuthSession();

    const res = await app.request(`/api/example`, {
      method: 'POST',
      body: JSON.stringify({
        name: faker.person.firstName(),
      }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    expect(res.status).toBe(204);
  });

  it('POST / returns 400 when item is duplicated', async () => {
    mockAuthSession();
    const name = faker.person.firstName();

    await app.request(`/api/example`, {
      method: 'POST',
      body: JSON.stringify({
        name,
      }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const res = await app.request(`/api/example`, {
      method: 'POST',
      body: JSON.stringify({
        name,
      }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    expect(res.status).toBe(400);
  });

  it('PUT /{id} returns 404 if example does not exist', async () => {
    mockAuthSession();
    const fakeUUID = faker.string.uuid();

    const res = await app.request(`/api/example/${fakeUUID}`);

    expect(res.status).toBe(404);
  });

  it('PUT /{id} edits existing example', async () => {
    mockAuthSession();
    const { examples } = await examplesStub();
    const originalExample = examples[0];
    const reqBody = { name: faker.person.firstName() };

    const res = await app.request(`/api/example/${originalExample.id}`, {
      method: 'PUT',
      body: JSON.stringify(reqBody),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({ id: originalExample.id, name: reqBody.name });
  });

  it('DELETE /{id} returns 404 if example does not exist', async () => {
    mockAuthSession();
    const fakeUUID = faker.string.uuid();

    const res = await app.request(`/api/example/${fakeUUID}`, {
      method: 'DELETE',
    });
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body).toEqual({ error: `${fakeUUID} not found` });
  });

  it('DELETE /{id} returns 204 when item is successfully deleted', async () => {
    mockAuthSession();
    const { examples } = await examplesStub();

    const res = await app.request(`/api/example/${examples[0].id}`, {
      method: 'DELETE',
    });

    expect(res.status).toBe(204);
  });
});
