const API_URL = 'http://localhost:5015/api';

async function request(method, path, body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

async function runTests() {
  console.log('--- STARTING CRUD AND OWNERSHIP TESTS ---');
  
  // 1. Register User A & B
  const userA_id = `userA_${Date.now()}`;
  const userB_id = `userB_${Date.now()}`;
  
  await request('POST', '/auth/register', { name: 'User A', email: `${userA_id}@example.com`, password: 'password123' });
  await request('POST', '/auth/register', { name: 'User B', email: `${userB_id}@example.com`, password: 'password123' });
  
  // 2. Login User A & B
  const loginA = await request('POST', '/auth/login', { email: `${userA_id}@example.com`, password: 'password123' });
  const loginB = await request('POST', '/auth/login', { email: `${userB_id}@example.com`, password: 'password123' });
  
  const tokenA = loginA.data.token;
  const tokenB = loginB.data.token;
  
  if (!tokenA || !tokenB) {
    console.error('Failed to get tokens:', loginA.data, loginB.data);
    return;
  }
  console.log('✅ Users registered and authenticated.');

  // 3. Unauthenticated requests
  const noTokenReq = await request('GET', '/tasks');
  if (noTokenReq.status === 401) {
    console.log('✅ Unauthenticated GET blocked (401)');
  } else {
    console.error('❌ Unauthenticated GET failed:', noTokenReq);
  }

  // 4. User A creates a task
  const createA = await request('POST', '/tasks', { title: 'Task A', description: 'User A task' }, tokenA);
  if (createA.status === 201 && createA.data.authorId) {
    console.log('✅ User A created a task.');
  } else {
    console.error('❌ User A create task failed:', createA);
  }
  const taskAId = createA.data._id;
  const authorAId = createA.data.authorId;

  // 5. User B tries to update Task A
  const updateB = await request('PUT', `/tasks/${taskAId}`, { title: 'Hacked by B' }, tokenB);
  if (updateB.status === 403) {
    console.log('✅ User B prevented from updating User A task (403)');
  } else {
    console.error('❌ User B was able to update User A task:', updateB);
  }

  // 6. User B tries to delete Task A
  const deleteB = await request('DELETE', `/tasks/${taskAId}`, null, tokenB);
  if (deleteB.status === 403) {
    console.log('✅ User B prevented from deleting User A task (403)');
  } else {
    console.error('❌ User B was able to delete User A task:', deleteB);
  }

  // 7. User B reads their own tasks (should be empty, shouldn't see A's)
  const getB = await request('GET', '/tasks', null, tokenB);
  if (getB.status === 200 && getB.data.length === 0) {
    console.log('✅ User B only sees their own tasks (none).');
  } else {
    console.error('❌ User B GET tasks incorrect:', getB.data);
  }

  // 8. User A updates their own task
  const updateA = await request('PUT', `/tasks/${taskAId}`, { title: 'Task A Updated', description: 'Updated' }, tokenA);
  if (updateA.status === 200) {
    console.log('✅ User A updated their own task.');
  } else {
    console.error('❌ User A failed to update task:', updateA);
  }

  // 9. User A deletes their own task
  const deleteA = await request('DELETE', `/tasks/${taskAId}`, null, tokenA);
  if (deleteA.status === 200) {
    console.log('✅ User A deleted their own task.');
  } else {
    console.error('❌ User A failed to delete task:', deleteA);
  }

  console.log('--- TESTS COMPLETE ---');
  process.exit(0);
}

runTests();
