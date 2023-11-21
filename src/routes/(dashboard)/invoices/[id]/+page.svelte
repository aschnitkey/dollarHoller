<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	const printInvoice = () => {
		console.log('printing');
	};

	const copyLink = () => {
		console.log('copying');
	};

	const sendInvoice = () => {
		console.log('sending');
	};
</script>

<div class="fixed z-0 flex justify-between w-full max-w-screen-lg mb-16">
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex items-center gap-4">
		<Button
			height="short"
			label="Print"
			style="outline"
			isAnimated={false}
			onClick={printInvoice}
		/>
		<Button height="short" label="Copy Link" onClick={copyLink} />
		<Button height="short" label="Send" onClick={sendInvoice} />
	</div>
</div>

<div
	class="relative z-10 grid grid-cols-6 px-32 py-16 bg-white top-32 gap-x-5 gap-y-8 shadow-invoice"
>
	<div class="col-span-3">
		<img
			src="/images/logo.png"
			srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
			alt="Compressed.fm logo"
		/>
	</div>

	<div class="col-span-2 col-start-5 pt-4">
		<div class="label">From</div>
		<p>
			Andrew Schnitkey<br />
			8329 Cliffthorne Way<br />
			Columbus, OH 43235
		</p>
	</div>

	<div class="col-span-3">
		<div class="label">Bill To:</div>
		<p>
			<strong>ZEAL</strong><br />
			zeal@example.com<br />
			789 Stellar St<br />
			Anywhereville, CA 56789
		</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Invoice ID</div>
		<p>12348</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>October 6, 2023</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Issue Date</div>
		<p>July 26, 2023</p>
	</div>

	<div class="col-span-6">
		<div class="label">Subject</div>
		<p>Website</p>
	</div>

	<div class="col-span-6">
		<!-- Issue Date -->
	</div>

	<div class="col-span-6">
		<div class="label">Notes</div>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, quisquam. Dicta impedit quo
			laborum, hic suscipit eius ab minima facere delectus a nam porro, reiciendis veniam? Mollitia
			est provident laudantium.
		</p>
	</div>

	<div class="col-span-6">
		<div class="label">Terms and Conditions</div>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, quisquam. Dicta impedit quo
			laborum, hic suscipit eius ab minima facere delectus a nam porro, reiciendis veniam? Mollitia
			est provident laudantium.
		</p>
	</div>
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>
