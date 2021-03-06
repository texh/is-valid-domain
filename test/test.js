var test = require('tape');
var isValidDomain = require('../');

test('is valid domain', function(t) {
  t.plan(59);

  // tld and subdomains
  t.equal(isValidDomain('example.com'), true);
  t.equal(isValidDomain('foo.example.com'), true);
  t.equal(isValidDomain('bar.foo.example.com'), true);
  t.equal(isValidDomain('exa-mple.co.uk'), true);
  t.equal(isValidDomain('a.com'), true);
  t.equal(isValidDomain('a.b'), true);
  t.equal(isValidDomain('foo.bar.baz'), true);
  t.equal(isValidDomain('foo-bar.ba-z.qux'), true);
  t.equal(isValidDomain('hello.world'), true);
  t.equal(isValidDomain('ex-am-ple.com'), true);
  t.equal(isValidDomain('xn--80ak6aa92e.com'), true)
  t.equal(isValidDomain('example.a9'), true);
  t.equal(isValidDomain('example.9a'), true);
  t.equal(isValidDomain('example.99'), false);

  // unicode
  t.equal(isValidDomain('xn--6qq79v.xn--fiqz9s'), true);
  t.equal(isValidDomain('xn--ber-goa.com'), true);

  // invalid tld and subdomains
  t.equal(isValidDomain('bar.q-ux'), false);
  t.equal(isValidDomain('exa_mple.com'), false);
  t.equal(isValidDomain('example'), false);
  t.equal(isValidDomain(''), false);
  t.equal(isValidDomain({}), false);
  t.equal(isValidDomain(function(){}), false);
  t.equal(isValidDomain('ex*mple.com'), false);
  t.equal(isValidDomain('@#$@#$%fd'), false);
  t.equal(isValidDomain(3434), false);
  t.equal(isValidDomain('_example.com'), false);
  t.equal(isValidDomain('-example.com'), false);
  t.equal(isValidDomain('xn–pple-43d.com'), false)
  t.equal(isValidDomain('foo._example.com'), false);
  t.equal(isValidDomain('foo.-example.com'), false);
  t.equal(isValidDomain('foo.example-.co.uk'), false);
  t.equal(isValidDomain('example-.com'), false);
  t.equal(isValidDomain('example_.com'), false);
  t.equal(isValidDomain('foo.example-.com'), false);
  t.equal(isValidDomain('foo.example_.com'), false);
  t.equal(isValidDomain('example.com-'), false);
  t.equal(isValidDomain('example.com_'), false);
  t.equal(isValidDomain('-foo.example.com_'), false);
  t.equal(isValidDomain('_foo.example.com_'), false);
  t.equal(isValidDomain('*.com_'), false);
  t.equal(isValidDomain('*.*.com_'), false);

  // subdomain
  t.equal(isValidDomain('example.com'), true);
  t.equal(isValidDomain('foo.example.com'), true);
  t.equal(isValidDomain('foo.example.com', {subdomain: true}), true);
  t.equal(isValidDomain('foo.example.com', {subdomain: false}), false);
  t.equal(isValidDomain('example.com', {subdomain: false}), true);
  t.equal(isValidDomain('*.example.com', {subdomain: true}), false);

  // second level domain
  t.equal(isValidDomain('example.co.uk'), true);
  t.equal(isValidDomain('exampl1.co.uk', {subdomain: false}), true);
  t.equal(isValidDomain('abc.example.co.uk', {subdomain: false}), false);
  t.equal(isValidDomain('*.example.co.uk', {subdomain: true}), false);
  t.equal(isValidDomain('*.example.co.uk', {subdomain: true, wildcard: true}), true);

  // wildcard
  t.equal(isValidDomain('*.example.com'), false);
  t.equal(isValidDomain('*.example.com', {wildcard:false}), false);
  t.equal(isValidDomain('*.example.com', {wildcard:true}), true);
  t.equal(isValidDomain('*.*.com', {wildcard:true}), false);
  t.equal(isValidDomain('*.com', {wildcard:true}), false);
  t.equal(isValidDomain('*.example.com', {subdomain: true, wildcard: true}), true);
  t.equal(isValidDomain('*.example.com', {subdomain: false, wildcard: true}), false);
});
