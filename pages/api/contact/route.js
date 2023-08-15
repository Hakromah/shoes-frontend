import { NextResponse } from 'next/server';

export async function POST(req) {
	const { fullname, email, message } = await req.json();
	console.log('full name', fullname);
	console.log('email', email);
	console.log('meaasge', message);

	return NextResponse.json({ msg: ['Hello fom route.js'] });
}
